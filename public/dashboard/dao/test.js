function check(value, option) {
    let check = {
        isMobilePhone: value => value,
    };
    return check[Object.keys(option)[0]](value);
}

console.log(check('tel', { isMobilePhone: true }));
