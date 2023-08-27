async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

document.querySelector('button').addEventListener('click', async () => {
    const tab = await getCurrentTab();

    fetch('https://api.publicapis.org/entries', {})
        .then(response => response.json())
        .then(data => {

            const desc = data.entries[0].Description
            const link = data.entries[0].Link

            document.querySelector('h1').innerHTML = desc;
            document.querySelector('h1').innerHTML = link;
        }).then(() => {

            document.querySelector('span').addEventListener('click', () => {

                let test1 = document.querySelector('h1').textContent;

                chrome.scripting.executeScript({
                    target: { tabId: tab.id, allFrames: true },
                    func: test,
                    args: [test1],
                }, () => {
                    console.log('ok');
                })

            });
        });
});


function test(test1) {
    document.querySelector('.HeaderNav').innerHTML = test1;
}