from random import randint
import socket


def port_get_free():
    while True:
        port = randint(12000, 13000)
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        if not (sock.connect_ex(('127.0.0.1', port)) == 0):
            return port
