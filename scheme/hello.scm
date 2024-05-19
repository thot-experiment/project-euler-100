(import (chicken time))

(define (hello-world-n-times n)
  (define start (current-seconds))
  (let loop ((i n))
    (when (> i 0)
      (display "Hello, World!\n")
      (loop (- i 1))))
  (- (current-seconds) start))

(define elapsed-time (hello-world-n-times 100))
(print "Elapsed time: " elapsed-time " seconds")
