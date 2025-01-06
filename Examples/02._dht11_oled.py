# ******************************************************************************************
# FileName     : 02._dht11_oled
# Description  : 온습도(DHT11) 센서 값 OLED에 표시하기
# Author       : 손철수
# Created Date : 2023.08.06
# Reference    :
# Modified     : 2023.09.11 : KTW : 코드 수정, 주석 수정
# ******************************************************************************************


# import
import time
from ETboard.lib.pin_define import *
import dht
from ETboard.lib.OLED_U8G2 import *


# global variable
sensor = dht.DHT11(Pin(D2))                                     # 온습도(DHT11) 센서 핀 지정
oled = oled_u8g2()


# setup
def setup():
    pass                                                        # 아무것도 안함


# main loop
def loop():
    sensor.measure()                                            # 온습도 센서 값 측정
    temp = sensor.temperature()
    humi = sensor.humidity()

    oled.clear()
    oled.setLine(1, 'DHT11 sensor')                             # OLED 모듈 1번 줄에 저장
    oled.setLine(2, 'temp: ' + str(temp) + 'C')                 # OLED 모듈 2번 줄에 저장
    oled.setLine(3, 'humi: ' + str(humi) + '%')                 # OLED 모듈 3번 줄에 저장
    oled.display()                                              # 저장된 내용을 oled 에 보여줌

    print(str(temp) + 'C',                                      # 온도 값 출력
          str(humi) + '%')                                      # 습도 값 출력

    time.sleep(1)                                               # 1초 기다리기


if __name__ == "__main__":
    setup()
    while True:
        loop()

# ==========================================================================================
#
#  (주)한국공학기술연구원 http://et.ketri.re.kr
#
# ==========================================================================================