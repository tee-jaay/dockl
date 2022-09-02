# images, containers, volumes data as json
import json
import os
import re
from helper.return_format import return_format
from helper.string_escape import string_escape


def objects_data(password=None, commandDocker=None):
    data = []
    item = None
    passwordSudo = string_escape(password)
    result = os.popen("echo %s|sudo -S %s" %
                      (passwordSudo, commandDocker)).read().split('\n')
    for item in range(0, len(result[:-1])):
        obj = json.loads(result[item])
        data.append(obj)
    return return_format(200, '', data)
