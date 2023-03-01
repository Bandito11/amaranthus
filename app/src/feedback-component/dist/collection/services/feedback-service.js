const url = 'https://feedback-d71f5.uc.r.appspot.com/add';
export async function addFeedback(data) {
  if (!data.feedback) {
    throw `Feedback property is empty`;
  }
  if (!data.componentKey) {
    throw `component Id property is empty`;
  }
  const feedback = {
    feedback: data.feedback,
  };
  const response = await fetch(url, {
    headers: [['component-key', data.componentKey]],
    body: JSON.stringify(feedback),
    method: 'POST',
    mode: 'cors',
  });
  if (response.status === 200) {
    const message = await response.text();
    if (message === 'true') {
      return true;
    }
    else {
      try {
        const error = JSON.parse(message);
        return error.error;
      }
      catch (error) {
        return error;
      }
    }
  }
}
//# sourceMappingURL=feedback-service.js.map
