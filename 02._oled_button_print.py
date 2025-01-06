# ******************************************************************************************
# FileName     : 02._oled_button_print
# Description  : OLED 모듈에 누른 버튼 색상을 출력 해보기
# Author       : 이승찬
# Created Date : 2021.08.18
# Reference    :
# Modified     : 2022.02.08 : SJI : 헤더 수정, 주석 수정, 소스 크린징
# ******************************************************************************************


# import
from machine import Pin
from ETboard.lib.OLED_U8G2 import *


# global variable
oled = oled_u8g2()

PinD6 = Pin(D6)                       # 빨강 버튼 핀 지정
PinD7 = Pin(D7)                       # 파랑 버튼 핀 지정
PinD8 = Pin(D8)                       # 초록 버튼 핀 지정
PinD9 = Pin(D9)                       # 노랑 버튼 핀 지정


# setup
def setup():
    PinD6.init(Pin.IN)                # D6을 버튼 입력모드 설정하기
    PinD7.init(Pin.IN)                # D7을 버튼 입력모드 설정하기
    PinD8.init(Pin.IN)                # D8을 버튼 입력모드 설정하기
    PinD9.init(Pin.IN)                # D9을 버튼 입력모드 설정하기


# main loop
def loop():
    button_red = PinD6.value()
    button_blue = PinD7.value()
    button_green = PinD8.value()
    button_yellow = PinD9.value()
    
    oled.clear()
    oled.setLine(2, "PushButton!")    # PushButton! 출력
    
    if button_red == LOW:             # 빨강 버튼 누르면 red 출력
        oled.clear()
        oled.setLine(2, "red")        
        
    if button_blue == LOW:            # 파랑 버튼 누르면 blue 출력
        oled.clear()
        oled.setLine(2, "blue")       
        
    if button_green == LOW:           # 초록 버튼 누르면 green 출력
        oled.clear()
        oled.setLine(2, "green")      
        
    if button_yellow == LOW:          # 노랑 버튼 누르면 yellow 출력
        oled.clear()
        oled.setLine(2, "yellow")     
    
    oled.display()                    # OLED에 표시


if __name__ == "__main__":
    setup()
    while True:
        loop()

# ==========================================================================================
#
#  (주)한국공학기술연구원 http://et.ketri.re.kr
#
# ==========================================================================================
