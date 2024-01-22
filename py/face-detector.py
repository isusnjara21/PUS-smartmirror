import cv2
from picamera2 import Picamera2

face_detector = cv2.CascadeClassifier('/home/smartmirror/Desktop/PUS-smartmirror/py/haarcascade_frontalface_default.xml')
cv2.startWindowThread()

picam2 = Picamera2()
picam2.configure(picam2.create_preview_configuration(main={"format": 'XRGB8888', "size": (640, 480)}))
picam2.start()
try:
    while True:
        im = picam2.capture_array()

        grey = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
        faces = face_detector.detectMultiScale(grey, scaleFactor=1.1, minNeighbors=5, minSize=(50, 50))

        with open('face_detection_result.txt', 'w') as file:
            file.write('1' if len(faces)>0 else '0')
except KeyboardInterrupt:
        print("Interrupted by user")
finally:
    picam2.stop_recording()