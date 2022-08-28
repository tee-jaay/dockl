import socket


def check_port(port=None):
    while True:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        if (sock.connect_ex(('127.0.0.1', port)) == 0):
            print("busy", port)
            return "busy"
        else:
            print("Not busy port # ", port)
            return "not_busy"
