function timerWrapper(functionToCall) {
    const startTime = performance.now();
    const result = functionToCall();
    const endTime = performance.now();
    console.log(
        `Execution time for ${functionToCall.name}: ${endTime - startTime} ms`
    );

    return result;
}

export default timerWrapper;
