from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as EC
# follow the first instructions from https://selenium-python.readthedocs.io/installation.html#downloading-python-bindings-for-selenium
# Download the chrome driver and put it inside /usr/local/bin

# creates webdriver class
options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--headless")

driver = webdriver.Chrome(options=options)
driver.get("http://www.google.com")

def get_query_from_goog(query):

    # finds searchbox
    elem = driver.find_element_by_name("q")
    # sends query
    elem.send_keys(query)

    # obtain searchform
    searchform = driver.find_element_by_id("searchform")
    wait = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "aajZCb")))
    box = driver.find_element_by_class_name("aajZCb")
    print('box: ',box.text)
    answers = box.text.split('\n')
    elem.clear()

    return answers

def close_goog():
    elem.submit()
    driver.close()
