
export default {
  fire: (content = {}, event = 'trigger', type = 'success') => {
    try {
      window.vfeTracker.log({
        event: event,
        content: content
      }, type)
    } catch (error) {
      window.console.log(error)
    }
  }
}