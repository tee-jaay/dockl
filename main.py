import eel
import requests

from requests.exceptions import ConnectionError
from helper.internet_connection_check import check_internet_connect

from helper.port_get_free import port_get_free
from helper.return_format import return_format

from service.dashboard_data import dashboard_data
from service.objects_data import objects_data
from service.action import container_action, image_action, volume_action

eel.init('web/dist')


@eel.expose
def get_dashboard_data(password=None, commandDocker=None):
    return dashboard_data(
        password=password, commandDocker=commandDocker)


# Get images list


@eel.expose
def get_image_list(password=None, commandDocker=None):
    return objects_data(
        password=password, commandDocker=commandDocker)


# Get containers list


@eel.expose
def get_container_list(password=None, commandDocker=None):
    return objects_data(
        password=password, commandDocker=commandDocker)

# Get volumes list


@eel.expose
def get_volume_list(password=None, commandDocker=None):
    return objects_data(
        password=password, commandDocker=commandDocker)

# Containers actions


@eel.expose
def container_run(password=None, commandDocker=None):
    return container_action(password=password, commandDocker=commandDocker)


@eel.expose
def container_start(password=None, commandDocker=None):
    return container_action(password=password, commandDocker=commandDocker)


@eel.expose
def container_stop(password=None, commandDocker=None):
    return container_action(password=password, commandDocker=commandDocker)


@eel.expose
def container_delete(password=None, commandDocker=None):
    return container_action(password=password, commandDocker=commandDocker)


# Volume
@eel.expose
def volume_inspect(password=None, commandDocker=None):
    return volume_action(password=password, commandDocker=commandDocker)


@eel.expose
def volume_delete(password=None, commandDocker=None):
    return volume_action(password=password, commandDocker=commandDocker)

# Image


@eel.expose
def image_search(keyword):
    result = None
    print(keyword)
    search_url = "https://hub.docker.com/api/content/v1/products/search?q="

    url = search_url + keyword

    if check_internet_connect() == False:
        result = return_format(500, 'internet connection error', result)
    else:
        response = requests.get(url)
        if response.status_code == 200:
            result = return_format(200, 'success', response.json())
    return result


@eel.expose
def image_pull(password=None, commandDocker=None):
    return image_action(password=password, commandDocker=commandDocker)


@eel.expose
def image_destroy(password=None, commandDocker=None):
    return image_action(password=password, commandDocker=commandDocker)


# Init app
eel.start('index.html', port=port_get_free(), mode='chrome',
          size=(1024, 600), position=(0, 0))
