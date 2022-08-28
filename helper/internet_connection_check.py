import urllib.request
import requests

timeout = 1


def check_internet_connection_active(timeout):
    try:
        requests.head("http://www.google.com/", timeout=timeout)
        print('The internet connection is active')
        return True
    except requests.ConnectionError:
        print("The internet connection is down")
        return False


def check_internet_connect():
    try:
        urllib.request.urlopen('http://google.com')
        return True
    except:
        return False
