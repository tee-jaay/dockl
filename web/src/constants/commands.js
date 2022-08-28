class DockerCommands {
    static PASSWORD_SUDO = "-pl,)OKM";

    // static DASHBOARD_DATA = "docker info";
    static DASHBOARD_DATA = "docker info --format '{{json .}}'";

    static CONTAINER_LIST = "docker container list -a --format '{{json .}}'";
    static CONTAINER_START = "docker container start";
    static CONTAINER_STOP = "docker container stop";
    static CONTAINER_RUN = "docker run";
    static CONTAINER_DELETE = "docker rm";

    static IMAGE_PULL = "docker pull";
    static IMAGE_REMOVE = "docker image rm ";
    static IMAGE_LIST = "docker image list -a --format '{{json .}}'";

    static VOLUME_LIST = "docker volume list --format '{{json .}}'";
    static VOLUME_DELETE = "docker volume rm";
}

export default DockerCommands;
