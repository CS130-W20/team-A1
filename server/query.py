from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
# follow the first instructions from https://selenium-python.readthedocs.io/installation.html#downloading-python-bindings-for-selenium
# Download the chrome driver and put it inside /usr/local/bin

# creates webdriver class
driver = webdriver.Chrome()
driver.get("http://www.google.com")

# finds searchbox
elem = driver.find_element_by_name("q")
# sends query
elem.send_keys("What happens if I")

# obtain searchform
searchform = driver.find_element_by_id("searchform")
wait = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "aajZCb")))
box = driver.find_element_by_class_name("aajZCb")
print('box: ',box.text)
answers = box.text.split('\n')

# txt = searchform.text
# print('type: ', type(txt))
# print('txt: ', txt)

# close elem and driver
elem.submit()
driver.close()

# Prints python list answers
print('answers: ', answers)


#  --- Commented out example --- 
# assert "Python" in driver.title
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close()