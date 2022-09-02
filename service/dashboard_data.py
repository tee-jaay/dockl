# returns dashboard info data as json object
import json
import os
from helper.return_format import return_format
from helper.string_escape import string_escape


def dashboard_data(password=None, commandDocker=None):
    passwordSudo = string_escape(password)
    result = os.popen("echo %s|sudo -S %s" %
                      (passwordSudo, commandDocker)).read().split('\n')
    command_result = os.popen("echo $?").read().split('\n')
    print("command result", command_result[0])
    return return_format(200, '', json.loads(result[:-1][0]))
