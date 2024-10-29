import sqlite3

class Db:
    """
    needs a db file path, it is relative to the db file
    Db.connection for connection
    Db.cursor for cursor
    :D
    """
    def __init__(self, db_path) -> None:
        self.connection = sqlite3.connect(db_path)
        self.cursor = self.connection.cursor()
        self.init_tables()

    def init_tables(self) -> None:
        query : str = '''
        CREATE TABLE IF NOT EXISTS staff (
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                role TEXT NOT NULL,
                date_added TEXT NOT NULL
                )
        '''
        self.cursor.execute(query)

