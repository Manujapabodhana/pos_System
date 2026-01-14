import pymysql
import pymysql.cursors
from flask import g

class MySQL:
    def __init__(self, app=None):
        self.app = app
        if app is not None:
            self.init_app(app)
            
    def init_app(self, app):
        self.app = app
        app.teardown_appcontext(self.teardown)
        
    def connect(self):
        return pymysql.connect(
            host=self.app.config['MYSQL_HOST'],
            user=self.app.config['MYSQL_USER'],
            password=self.app.config['MYSQL_PASSWORD'],
            database=self.app.config['MYSQL_DB'],
            cursorclass=pymysql.cursors.DictCursor if self.app.config.get('MYSQL_CURSORCLASS') == 'DictCursor' else pymysql.cursors.Cursor
        )
        
    @property
    def connection(self):
        if 'db_conn' not in g:
            g.db_conn = self.connect()
        return g.db_conn
        
    def teardown(self, exception):
        db_conn = g.pop('db_conn', None)
        if db_conn is not None:
            db_conn.close()

mysql = MySQL()

def init_db(app):
    mysql.init_app(app)
