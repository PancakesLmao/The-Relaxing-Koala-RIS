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
