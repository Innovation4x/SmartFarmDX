# ******************************************************************************************
# FileName     : 03._oled_photoresistor_sensor_result
# Description  : 조도센서의 값을 이용하여 낮, 밤 OLED에 출력 해보기
# Author       : 이승찬
# Created Date : 2021.08.18
# Reference    :
# Modified     : 2022.02.08 : SJI : 헤더 수정, 주석 수정, 소스 크린징
# Modified     : 2023.09.11 : KTW : 코드 수정, 주석 수정
# ******************************************************************************************


# import
import time
from machine import Pin, ADC
from ETboard.lib.OLED_U8G2 import *


# global variable
oled = oled_u8g2()
sensor = ADC(Pin(A1))                      # 조도센서 핀 지정


# setup
def setup():
    sensor.atten(ADC.ATTN_11DB)            # 조도센서 입력 모드 설정 


# main loop
def loop():
    CDS_Value = sensor.read()              # 조도센서 값 받기

    if CDS_Value >= 700:                   # 조도센서의 값이 700 이상이면
        oled.clear()                       # oled 내용을 지우기
        oled.setLine(2, "Morning !")       #  Morning ! 출력하기

    if CDS_Value < 700:                    # 조도센서의 값이 700 미만이면
        oled.clear()                       # oled 내용을 지우기
        oled.setLine(2, "Night !")         # Night ! 출력하기

    oled.display()                         # OLED에 표시

    print(CDS_Value)                       # 조도 센서 값 출력

    time.sleep(0.2)                        # 0.2초 기다리기


if __name__ == "__main__":
    setup()
    while True:
        loop()

# ==========================================================================================
#
#  (주)한국공학기술연구원 http://et.ketri.re.kr
#
# ==========================================================================================