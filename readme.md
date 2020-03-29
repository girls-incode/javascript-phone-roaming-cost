# Example of phone roaming bill calculation

Write a function that reads a string S from a txt file F with more lines N separated by end-of-line character \n.

Each line describes one phone call using the format: "hh:mm:ss,nnn-nnn-nnn", 
where "hh:mm:ss" is the duration of the call (hours, minutes and seconds) and 
"nnn-nnn-nnn" is the 9-digit phone number of the receiver (with no leading zeros).
Each call is billed separately.

If the call was shorter than 5 minutes, then you pay 4 cents for every started second of the call 
(for duration "00:01:05" you pay 65 * 4 = 260 cents).

If the call was at least 5 minutes long, then you pay 120 cents for every started minute of the call 
(for duration "00:05:00" you pay 5 * 120 = 600 cents and for duration "00:05:01" you pay 
6 * 120 = 720 cents).

All calls to the phone number that has the longest total duration of calls are free. 
If more phone numbers have the same longest total duration, then the discount is applied only to the 
numerical phone number value.

Given a string S describing phone call logs, calculate the amount of money to be paid in cents.
```
Suppose logs.txt contains:

00:01:07,300-860-010
00:05:01,701-080-080
00:03:01,401-120-770
00:01:22,301-511-070
00:05:67,250-104-991
00:05:00,300-860-010
```
The function should return 2640 because:
```
All calls to 300860010 costs 868 cents for 367 seconds (5min 7sec)

All calls to 701080080 costs 720 cents for 301 seconds

All calls to 401120770 costs 724 cents for 181 seconds

All calls to 301511070 costs 328 cents for 82 seconds

All calls to 250104991 costs 720 cents for 367 seconds (5min 67sec)

Total cost: 3360
```
Phone numbers 300860010 and 250104991 have the longest duration of 367 seconds. 

As 250104991 < 300860010 then the Final cost: 3360 - 720 = 2640
