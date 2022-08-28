# images, containers, volumes data as json
import json
import os
import re
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
    return data


# def objects_data(password=None, commandDocker=None):
#     data = []
#     passwordSudo = string_escape(password)
#     result = os.popen("echo %s|sudo -S %s" %
#                       (passwordSudo, commandDocker)).read().split('\n')
#     result_filtered = result[1:-1]
#     for i in range(len(result_filtered)):
#         chunk = re.split(' +', result_filtered[i])
#         print(chunk)
#         data.append(chunk)
#     data = json.loads(result_filtered)
#     return data
