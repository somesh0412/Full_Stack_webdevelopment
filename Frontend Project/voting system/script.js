document.addEventListener('DOMContentLoaded', () => {
    const votingForm = document.getElementById('voting-form');
    const ballotBox = document.getElementById('ballot-box');
    const votedMessage = document.getElementById('voted-message');
    const chosenSpan = document.getElementById('chosen-candidate');

    // 1. Check if the user has already voted on this device
    const previousVote = localStorage.getItem('user_vote');

    if (previousVote) {
        showAlreadyVoted(previousVote);
    }

    // 2. Handle the voting submission
    votingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Double-check storage before processing (security layer)
        if (localStorage.getItem('user_vote')) {
            alert("Security Alert: You have already cast your vote.");
            return;
        }

        const selectedOption = document.querySelector('input[name="candidate"]:checked');
        
        if (selectedOption) {
            const voteValue = selectedOption.value;

            // Save vote to Local Storage to prevent re-voting
            localStorage.setItem('user_vote', voteValue);
            
            showAlreadyVoted(voteValue);
        }
    });

    function showAlreadyVoted(candidate) {
        ballotBox.classList.add('hidden');
        votedMessage.classList.remove('hidden');
        chosenSpan.innerText = candidate;
    }
});