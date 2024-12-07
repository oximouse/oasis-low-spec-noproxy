import requests

# Read authorization token from tokens.txt
try:
    with open('tokens.txt', 'r') as token_file:
        auth_token = token_file.readline().strip()
        if not auth_token:
            raise ValueError("Token file is empty. Please add a valid token to tokens.txt.")
except FileNotFoundError:
    print("File 'tokens.txt' not found. Please create the file and add your token.")
    exit()
except ValueError as e:
    print(e)
    exit()

# Set headers and base URL
headers = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'authorization': auth_token,  # Token read from file
    'content-type': 'application/json',
    'origin': 'https://dashboard.oasis.ai',
    'referer': 'https://dashboard.oasis.ai/',
    'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36'
}
url_fetch = 'https://api.oasis.ai/internal/providerList,providerList,providerPointsTimeseries,settingsProfile?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A100%2C%22sortBy%22%3A%22latest%22%7D%7D%2C%221%22%3A%7B%22json%22%3A%7B%22offset%22%3A0%2C%22limit%22%3A100%2C%22sortBy%22%3A%22latest%22%7D%7D%2C%222%22%3A%7B%22json%22%3A%7B%22interval%22%3A%22week%22%7D%7D%2C%223%22%3A%7B%22json%22%3Anull%2C%22meta%22%3A%7B%22values%22%3A%5B%22undefined%22%5D%7D%7D%7D'

# Fetch data and extract IDs
response = requests.get(url_fetch, headers=headers)
if response.status_code == 200:
    try:
        data = response.json()
    except ValueError:
        print("Failed to parse JSON response.")
        print(f"Response Text: {response.text}")
        exit()
else:
    print(f"Failed to fetch data. HTTP Status: {response.status_code}")
    print(f"Response Text: {response.text}")
    exit()

def extract_ids(data):
    """ Recursively extract all 'id' values from nested JSON. """
    if isinstance(data, dict):
        for key, value in data.items():
            if key == 'id':
                yield value
            elif isinstance(value, (dict, list)):
                yield from extract_ids(value)
    elif isinstance(data, list):
        for item in data:
            yield from extract_ids(item)

# Extract unique IDs and save them to a file
unique_ids = sorted(set(extract_ids(data)))
if not unique_ids:
    print("No IDs found in the fetched data.")
    exit()

with open('id.txt', 'w') as file:
    file.writelines(f'{id}\n' for id in unique_ids)

#print(f"Unique IDs saved to id.txt: {unique_ids}")

# Read IDs from file and delete them
url_delete = 'https://api.oasis.ai/internal/providerDelete?batch=1'
for id_value in unique_ids:
    data = {"0": {"json": {"id": id_value}}}
    response = requests.post(url_delete, headers=headers, json=data)
    if response.status_code == 200:
        print(f"Successfully deleted ID {id_value}")
    else:
        print(f"Failed to delete ID {id_value}. HTTP Status: {response.status_code}")
        print(f"Response Text: {response.text}")
