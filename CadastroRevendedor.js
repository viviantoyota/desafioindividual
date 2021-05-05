'use strict';
​
var server = require('server');
​
server.get('Show', server.middleware.https, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var actionUrl = URLUtils.url('CadastroRevendedor-Subscribe').toString();
    var revendedorForm = server.forms.getForm('cadastroRevendedor');
    revendedorForm.clear();

    res.render('cadastroRevendedor', {
        actionURL: actionUrl,
        revendedorForm: revendedorForm
    });
    next();
});
​
server.post('Subscribe', server.middleware.https, function (req, res, next) {
    var Resource = require('dw/web/Resource');
    var revendedorForm = server.forms.getForm('cadastroRevendedor');
    var emailHelper = require('*/cartridge/scripts/helpers/emailHelpers');
    var myForm = req.form;
    var customObjMgr = require('dw/object/CustomObjectMgr');
    var transaction = require('dw/system/Transaction');
    transaction.begin();
    try{
        var newSubscribe = customObjMgr.createCustomObject('cadastroRevendedor', revendedorForm.email.value);
        newSubscribe.custom.email = revendedorForm.email.value;
        newSubscribe.custom.fullname = revendedorForm.fullname.value;
        newSubscribe.custom.phone = revendedorForm.phone.value;
        newSubscribe.custom.Message = contactForm.message.value;
        var contactDetails = [myForm.name, myForm.email, myForm.phone, myForm.message];
         res.json({
             success: true,
            msg: Resource.msg('success.message', 'form', null)
         });
        res.render('revendedor_sucesso', {
            revendedorForm: revendedorForm
        });
    }catch(e) {
        //Oops!
        transaction.rollback();
       }




       var isValidEmailid = emailHelper.validateEmail(myForm.email);
    if (isValidEmailid) {
        var contactDetails = [ myForm.name, myForm.email, myForm.phone];
        res.json({
            success: true,
            msg: Resource.msg('subscribe.to.contact.us.success', 'contact', null)
        });
    }  else {
        res.json({
            error: true,
            msg: Resource.msg('subscribe.to.contact.us.email.invalid', 'contact', null)
        });
    }
   return next();
});

module.exports = server.exports();