# returns dashboard info data as json object
import json
import os
import re
from helper.string_escape import string_escape


def dashboard_data(password=None, commandDocker=None):
    passwordSudo = string_escape(password)
    result = os.popen("echo %s|sudo -S %s" %
                      (passwordSudo, commandDocker)).read().split('\n')
    return json.loads(result[:-1][0])
