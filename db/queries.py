import psycopg2.extras
from datetime import date, datetime
from db.client import get_connection

def get_due_reminders():
    """ 
     Find all the active reminders that are due for today
     Check two things:
         - today's day of the week is in the reminder's days_of_week array
         - current time is within 5 minutes of one of the fire_times
    """
    now = datetime.now()
    
    # Convert to day of week (0 = Monday, ... , 6 = Sunday)
    today_dow = now.weekday() % 7

    # Connect to the db
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            # Query for active reminders that are due today
            cur.execute("""
                SELECT r.id, r.title, r.user_id, u.discord_id, u.phone
                FROM reminders r
                JOIN users u ON u.id = r.user_id
                WHERE r.active = true
                    AND %s = ANY(r.days_of_week)
                    AND EXISTS (
                        SELECT 1 FROM unnest(r.fire_times) AS ft
                        WHERE ft BETWEEN NOW()::time - interval '5 minutes'
                                    AND NOW()::time + interval '5 minutes'
                    )
            """, (today_dow,))
            return cur.fetchall()
    finally:
        conn.close()

def is_completed_today(reminder_id, user_id):
    """
    Check if a reminder has already been completed today
    Returns True if completed, False if not
    """
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT 1 FROM completions
                WHERE reminder_id = %s
                    AND user_id = %s
                    AND completed_on = CURRENT_DATE
            """, (reminder_id, user_id))
            return cur.fetchone() is not None
    finally:
        conn.close()

def mark_completed(reminder_id, user_id):
    """ 
    Mark a reminder as done for today by inserting a completion row
    The UNIQUE constraint in the schema prevents duplicate completions 
    """
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO completions (reminder_id, user_id, completed_on
                VALUES (%s, %s, CURRENT_DATE)
                ON CONFLICT DO NOTHING
            """, (reminder_id, user_id))
            conn.commit()
    finally:
        conn.close()

def get_user_by_identifier(discord_id=None, phone=None):
    """
    Look up a user by their provided credentials (Discord ID or phone number)
    Used when someone marks a reminder as done externally through Discord or SMS
    """
    if not discord_id and not phone:
        raise ValueError("Must provide either discord_id or phone")
    
    conn = get_connection()
    try:
        with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            if discord_id:
                cur.execute("""
                    SELECT * FROM users
                    WHERE discord_id = %s
                """, (discord_id))
            else:
                cur.execute("""
                    SELECT * FROM users
                    WHERE phone = %s
                """, (phone))
            return cur.fetchone()
    finally:
        conn.close()