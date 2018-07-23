tf = {
    authManager: {
        userName: "admin",
        password: "admin"
    }
};
tf.storageManager = new TF.StorageManager("rfweb");
tf.loadingIndicator = new TF.LoadingIndicator($('#loadingindicator'));
tf.ajax = new TF.Ajax(tf.loadingIndicator);
tf.promiseAjax = new TF.PromiseAjax(tf.ajax);
tf.promiseBootbox = {
    alert: function (message) {
        console.warn(message);
        return Promise.resolve();
    }
}
tf.timezonetotalminutes = -4 * 60;
tf.localization = {
    Postal: 'Zip Code',
    AreaName: 'State',
    LocalName: 'United States',
    MeasureSystem: 'US',
    UnitsOfMeasure: 'Miles',
    PerHour: 'MPH',
    Abbrev: 'mi',
    Vehicle: 'MPG',
    PostalCodeLength: 5
}
