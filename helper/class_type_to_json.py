# Convert class type to json
import json


def class_type_to_json(item):
    item_json_dumps = json.dumps(item.__dict__)
    item_json_loads = json.loads(item_json_dumps)
    return item_json_loads
