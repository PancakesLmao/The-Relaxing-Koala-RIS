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
        # create staff
        query : str = '''
        CREATE TABLE IF NOT EXISTS staff (
                staff_id INTEGER PRIMARY KEY NOT NULL,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                role TEXT NOT NULL,
                date_added TEXT NOT NULL
                ) 
        '''
        self.cursor.execute(query)

        # create tables
        query : str = '''
        create table if not exists tables (
                table_id integer not null primary key,
                table_number integer not null unique,
                table_capacity integer not null,
                table_status text not null default false,
                order_id text,
                date_added text not null
                ) 
        '''
        self.cursor.execute(query)

        # create orders
        query : str = '''
        CREATE TABLE IF NOT EXISTS orders (
                order_id INTEGER PRIMARY KEY NOT NULL,
                table_number INTEGER,
                date_added TEXT NOT NULL
                ) 
        '''
        self.cursor.execute(query)

        # create order_items
        query : str = '''
        CREATE TABLE IF NOT EXISTS order_items (
                order_item_id INTEGER PRIMARY KEY NOT NULL,
                order_id INTEGER,
                note TEXT,
                menu_item_id INTEGER NOT NULL,
                date_added TEXT NOT NULL
                ) 
        '''
        self.cursor.execute(query)

        # create menu_items
        query : str = '''
        CREATE TABLE IF NOT EXISTS menu_items (
                menu_item_id INTEGER PRIMARY KEY NOT NULL,
                item_name TEXT NOT NULL,
                price REAL NOT NULL,
                date_added TEXT NOT NULL
                ) 
        '''
        self.cursor.execute(query)

        # create invoices
        query : str = '''
        CREATE TABLE IF NOT EXISTS invoices (
                invoice_id INTEGER PRIMARY KEY NOT NULL,
                order_id INTEGER,
                date_added TEXT NOT NULL
                ) 
        '''
        self.cursor.execute(query)

        # create receipts
        query : str = '''
        CREATE TABLE IF NOT EXISTS receipts (
                receipt_id INTEGER PRIMARY KEY NOT NULL,
                invoice_id INTEGER,
                total_price REAL NOT NULL,
                total_after_tax REAL NOT NULL,
                payment_method TEXT NOT NULL,
                amount_given REAL NOT NULL DEFAULT 0.0,
                change REAL DEFAULT 0.0,
                date_added TEXT NOT NULL
                ) 
        '''
        self.cursor.execute(query)

        # create reservations
        query : str = '''
        CREATE TABLE IF NOT EXISTS reservations (
                reservation_id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                date_reserved TEXT NOT NULL,
                notes TEXT,
                date_added TEXT NOT NULL
                ) 
        '''
        self.cursor.execute(query)
