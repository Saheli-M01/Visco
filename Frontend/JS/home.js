//when the button is clicked it will go to the topic section
export function showtopic() {
    const homeSection = document.getElementById('topic');
    if (homeSection.style.display === 'none') {
        homeSection.style.display = 'block';
    } else {
        homeSection.style.display = 'none';
    }
}