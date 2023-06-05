import xml.etree.ElementTree as ET



tree = ET.parse("html/users/users_with_content.xml")

# DATA
root = tree.getroot()

users = root.findall("user")
user = [u for u in users if u.find("firstname").text == "Unai"]

if user:
    userlist = [user[0].find("firstname").text, user[0].find("lastname").text, 
                user[0].find("birthday").text, user[0].find("gender").text, 
                user[0].find("email").text, user[0].find("city").text, 
                user[0].find("postalcode").text, user[0].find("profileimage").text]
