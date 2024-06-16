let startTime, interval;

        document.getElementById('phoneNumber').addEventListener('input', function (e) {
            let input = e.target.value.replace(/\D/g, '');
            if (input.length > 3) {
                input = input.slice(0, 3) + '-' + input.slice(3);
            }
            if (input.length > 8) {
                input = input.slice(0, 8) + '-' + input.slice(8);
            }
            e.target.value = input;
        });

        function validatePhoneNumber() {
            const phoneNumber = document.getElementById('phoneNumber').value;
            const phoneRegex = /^010-\d{4}-\d{4}$/;
            if (!phoneRegex.test(phoneNumber)) {
                document.getElementById('error-message').textContent = '올바른 형식의 전화번호를 입력해주세요.';
            } else {
                document.getElementById('error-message').textContent = '';
                showTerms();
            }
        }

        function checkAll() {
            const isChecked = document.getElementById('checkAll').checked;
            document.getElementById('serviceTerms').checked = isChecked;
            document.getElementById('privacyTerms').checked = isChecked;
            document.getElementById('marketingTerms').checked = isChecked;
        }

        function proceedWithTerms() {
            const serviceTerms = document.getElementById('serviceTerms').checked;
            const privacyTerms = document.getElementById('privacyTerms').checked;
            if (!serviceTerms || !privacyTerms) {
                document.getElementById('terms-error-message').textContent = '필수 약관에 동의해주세요.';
            } else {
                document.getElementById('terms-error-message').textContent = '';
                showScreen(3);
            }
        }

        function startTimer() {
            startTime = new Date();
            interval = setInterval(updateTimer, 1000);
            showScreen(4);
        }

        function updateTimer() {
            const now = new Date();
            const elapsedTime = now - startTime;
            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);

            document.getElementById('timerhour').textContent = String(hours).padStart(2, '0');
            document.getElementById('timerminutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('timerseconds').textContent = String(seconds).padStart(2, '0');
        }

        function stopTimer() {
            clearInterval(interval);
            const now = new Date();
            const elapsedTime = now - startTime;
            const totalTimeInHalfHours = Math.floor(elapsedTime / 1800000);
            const totalFee = calculateFee(totalTimeInHalfHours);

            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);

            let totalTimeString = "";
            if (hours > 0) {
                totalTimeString += `${hours}시간 `;
            }
            totalTimeString += `${minutes}분 ${seconds}초`;

            document.getElementById('totalTime').textContent = `총 ${totalTimeString}`;
            document.getElementById('totalFee').textContent = `${totalFee}원`;
            showScreen(5);
        }

        function calculateFee(totalTimeInHalfHours) {
            const baseFee = 1000;
            const feePerHalfHours = 1000;
            return baseFee + (totalTimeInHalfHours * feePerHalfHours);
        }


        function showTerms() {
            document.getElementById('terms').style.display = 'block';
        }

        function showScreen(screenNumber) {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.add('hidden');
                screen.classList.remove('active');
            });
            document.getElementById(`screen${screenNumber}`).classList.remove('hidden');
            document.getElementById(`screen${screenNumber}`).classList.add('active');
        }