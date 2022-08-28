import os

from helper.string_escape import string_escape

# Image action


def image_action(password, commandDocker):
    print("password", password)
    print("command", commandDocker)
    passwordSudo = string_escape(password)
    result = os.popen("echo %s|sudo -S %s" %
                      (passwordSudo, commandDocker)).read().split('\n')
    result_filtered = result[:-1]
    if result_filtered != None:
        return result_filtered
    return True

# Container action


def container_action(password, commandDocker):
    print("password", password)
    print("command", commandDocker)
    passwordSudo = string_escape(password)
    result = os.popen("echo %s|sudo -S %s" %
                      (passwordSudo, commandDocker)).read().split('\n')
    result_filtered = result[:-1]
    if result_filtered != None:
        return result_filtered
    return True

# Volume delete


def volume_action(password, commandDocker):
    print("password", password)
    print("command", commandDocker)
    passwordSudo = string_escape(password)
    result = os.popen("echo %s|sudo -S %s" %
                      (passwordSudo, commandDocker)).read().split('\n')
    result_filtered = result[:-1]
    print("result_filtered", result_filtered)
    if result_filtered != None:
        return result_filtered
    return True
