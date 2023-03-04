let answerList = [
    "Вы не купили ни одного товара для того, чтобы так с нами разоваривать!",
    "Добрый день! До свидания!",
    "Кто тут?",
    "К сожалению все операторы сейчас заняты. Не пишите нам больше",
    "Где ваша совесть?",
    "Мы ничего не будем вам продавать!"
]

document.addEventListener('DOMContentLoaded', () => {
    const chatWidget = document.querySelector('.chat-widget')
    const input = document.getElementById('chat-widget__input')
    const widgetMessages = document.getElementById('chat-widget__messages')
    const chatWidgetContainer = document.querySelector('.chat-widget__messages-container')
    let WaitTime

    chatWidget.addEventListener('click', () => {
        chatWidget.classList.add('chat-widget_active')
        WaitTime = new Date().getTime()

        setInterval(() => {
            if ((new Date().getTime() - WaitTime) > 30000) {
                widgetMessages.innerHTML += `
                    <div class="message">
                        <div class="message__time">${new Date().getHours()}:${new Date().getMinutes()}</div>
                        <div class="message__text">
                        Вы будете что-нибудь спрашивать?
                        </div>
                    </div>
                    `

                chatWidgetContainer.scrollTo(0, chatWidgetContainer.scrollHeight)
                WaitTime = new Date().getTime()
            }
        }, 1000)
    })

    window.addEventListener('keydown', (event) => {
        if (document.activeElement.id == input.id && event.key == 'Enter') {
            if (input.value) {
                widgetMessages.innerHTML += `
                <div class="message message_client">
                    <div class="message__time">${new Date().getHours()}:${new Date().getMinutes()}</div>
                    <div class="message__text">
                    ${input.value}
                    </div>
                </div>
                <div class="message">
                    <div class="message__time">${new Date().getHours()}:${new Date().getMinutes()}</div>
                    <div class="message__text">
                    ${answerList[Math.floor(Math.random() * answerList.length)]}
                    </div>
                </div>
                `
                input.value = ''
                chatWidgetContainer.scrollTo(0, chatWidgetContainer.scrollHeight)
                WaitTime = new Date().getTime()
            }
        }
    })
}, false)