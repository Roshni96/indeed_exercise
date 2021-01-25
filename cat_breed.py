import requests
import sys
api_key=sys.argv[1]
breed_name = sys.argv[2]


headers = {
    
    'x-api-key':api_key
}

parameters={
'q':breed_name
}
try:
    #searching for breeds by name
    response = requests.get("https://api.thecatapi.com/v1/breeds/search", headers=headers, params=parameters)
    response.raise_for_status()

    # Additional code will only run if the request is successful
    res=response.json()
    if len(res) == 0:
        print('Invalid breed name')
    else:
    #extracting image id to display image
        image_id=res[0]['reference_image_id']

        url="https://api.thecatapi.com/v1/images/{0}".format(image_id)

        r=requests.get(url, headers=headers)
        print(r.json()['url'])
except requests.exceptions.HTTPError as errh:
    print(errh)
except requests.exceptions.ConnectionError as errc:
    print(errc)
except requests.exceptions.Timeout as errt:
    print(errt)
except requests.exceptions.RequestException as err:
    print(err)