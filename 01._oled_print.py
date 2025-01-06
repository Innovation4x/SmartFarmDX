# ******************************************************************************************
# FileName     : 01._oled_print
# Description  : oled 모듈에 "HelloWorld" 출력해보기
# Author       : 이인정
# Created Date : 2021.05.31
# Reference    :
# Modified     : 2021.06.01 : LIJ : 헤더수정
# Modified     : 2022.02.08 : SJI : 헤더수정, 주석 수정
# ******************************************************************************************


# import
from ETboard.lib.OLED_U8G2 import *


# global variable
oled = oled_u8g2()


# setup
def setup():
    pass


# main loop
def loop():
    oled.setLine(2, "HelloWorld")       # OLED 모듈에  HelloWorld 출력
    oled.display()                      # 저장된 내용을 oled 에 보여줌


if __name__ == "__main__":
    setup()
    while True:
        loop()

# ==========================================================================================
#
#  (주)한국공학기술연구원 http://et.ketri.re.kr
#
# ==========================================================================================
