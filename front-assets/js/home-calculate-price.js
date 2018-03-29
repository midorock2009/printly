
$(function(){
  $(document).on({
      ajaxStart: function() { $(".documentLoader").show();},
      ajaxStop: function() { $(".documentLoader").hide(); }    
  }); 
});
$(document).ready(function(){
    $('input[name="optDocumentType"]:checked').trigger('click');
});
var _select_ = selectt;
  $('body').on('click','input[name="optDocumentType"]',function(){
    var docId = $('input[name="optDocumentType"]:checked').val();
    var totalPage = $('input[name="txtTotalPages"]').val();
    if(docId != ''){
      setAttributes(docId,totalPage);
    }
    /**/
});
var isRunning = null;
function setAttributes(id,totalPage)
{
    isRunning = $.ajax({
        headers:{'X-CSRF-Token': $('input[name="_token"]').val()},
        url : SITE_URL+'/user/document-attributes/',
        type : "POST",
        dataType: 'JSON',
        data : {id: id,totalPage:totalPage},
        beforeSend:function(data, statusText, xhr, wrapper){
            if(isRunning != null){
                isRunning.abort();
            }
            var defaultList = ['<option value="" selected="selected" disabled="disabled">'+_select_+'</option>'];
            /*$("input[name='optPaperSize'],select[name='optPaperType'],select[name='optPaperWeight'],select[name='optPaperColor'],select[name='optPaperSide'],select[name='optBindingOptions'],select[name='optFoldingOptions']").html(defaultList.join(''));*/
            $('input[name="txtTotalPages"]').val(100);
            $('input[name="txtQuantity"]').val(1);
            $('#txtTotalCost').html('SAR 0.00');
            $('#paperWeightHTML').html('');
        },
        success:function(data, statusText, xhr, wrapper){
            isRunning = null;
            $('#loadingAttributes').hide();
            var paperSizeOptions = [''];
            var paperTypeOptions = [''];
            var paperWeightOptions = [''];
            var colorOptions = [''];
            var sideOptions = [''];
            var bindingOptions = [''];
            var foldingOptions = [''];
            if(data.status == "done")
            {   
                if(data.htmlSize.length > 0)
                {
                    var _output = data.htmlSize;
                    var _optionsList = '';
                    $.each(_output, function(i, val)
                    {
                        var obj = _output[i];
                        /*_optionsList += '<option value="'+obj.id+'">'+obj.name+'</option>';*/

                        _optionsList += '<input class="calc-radio clsPaperOptions" type="radio" name="optPaperSize" id="optPaperSize_'+obj.id+'" value="'+obj.id+'" data-select-opt="size"><label for="optPaperSize_'+obj.id+'">'+obj.name+'</label>';

                    /*_optionsList += '<input class="calc-radio"  type="radio" name="optPaperSize" id="optPaperSize"><label for="80gsm">'+obj.name+'</label>';*/

                    });
                    /*paperSizeOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>'+_optionsList);*/
                    paperSizeOptions.push(_optionsList);
                }
                /*else{
                  paperSizeOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>');
                }*/

                if(data.htmlType.length > 0)
                {
                    var _output = data.htmlType;
                    var _optionsList = '';
                    $.each(_output, function(i, val)
                    {
                        var obj = _output[i];
                        /*_optionsList += '<option value="'+obj.id+'">'+obj.name+'</option>';*/

                        _optionsList += '<input class="calc-radio clsPaperOptions" type="radio" name="optPaperType" id="optPaperType_'+obj.id+'" value="'+obj.id+'" data-select-opt="type"><label for="optPaperType_'+obj.id+'">'+obj.name+'</label>';
                    });
                    /*paperTypeOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>'+_optionsList);*/
                    paperTypeOptions.push(_optionsList);
                }
                /*else{
                  paperTypeOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>');
                }*/
                /*alert(data.htmlGsm.length);*/
                if(data.htmlGsm.length > 0)
                {
                    var _output = data.htmlGsm;
                    var _optionsList = '';
                    $.each(_output, function(i, val)
                    {
                        var obj = _output[i];
                        /*_optionsList += '<option value="'+obj.id+'">'+obj.name+' GSM</option>';*/
                        _optionsList += '<input class="calc-radio clsPaperOptions" type="radio" name="optPaperWeight" id="optPaperWeight_'+obj.id+'" value="'+obj.id+'" data-select-opt="weight" checked="checked"><label for="optPaperWeight_'+obj.id+'">'+obj.name+' GSM</label>';
                    });
                    /*paperWeightOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>'+_optionsList);*/
                    paperWeightOptions.push(_optionsList);
                }
                /*else{
                  paperWeightOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>');
                }*/

                if(data.htmlColor.length > 0)
                {
                    var _output = data.htmlColor;
                    var _optionsList = '';
                    $.each(_output, function(i, val)
                    {
                        var obj = _output[i];
                        //_optionsList += '<option value="'+obj.id+'">'+obj.name+'</option>';
                         _optionsList += '<input class="calc-radio" type="radio" name="optPaperColor" id="optPaperColor_'+obj.id+'" value="'+obj.id+'"><label for="optPaperColor_'+obj.id+'">'+obj.name+' </label>';

                    });
                    //colorOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>'+_optionsList);
                    colorOptions.push(_optionsList);

                }
                // else{
                //   colorOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>');
                // }

                if(data.htmlSides.length > 0)
                {
                    var _output = data.htmlSides;
                    var _optionsList = '';
                      _optionsList += '<h4>'+side+'</h4>';
                    $.each(_output, function(i, val)
                    {
                        var obj = _output[i];
                        _optionsList += '<input class="calc-radio" type="radio" name="optPaperSide" id="optPaperSide_'+obj.id+'" value="'+obj.id+'"><label for="optPaperSide_'+obj.id+'">'+obj.name+' </label>';
                    });
                    //sideOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>'+_optionsList);
                     sideOptions.push(_optionsList);
                }
                // else{
                //   sideOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>');
                // }

                if(data.htmlBindings.length > 0)
                {

                    var _output = data.htmlBindings;
                    var _optionsList = '';
                    $.each(_output, function(i, val)
                    {

                        var obj = _output[i];
                        if(obj.showCondition)
                        {
                            _optionsList += '<option value="'+obj.id+'">'+obj.name+'</option>';    
                        }
                        else
                        {
                            if(obj.id=='4')
                            {
                                _optionsList += '<option value="'+obj.id+'">'+obj.name+'</option>';
                            }
                            else
                            {
                                _optionsList += '<option disabled="disabled" value="'+obj.id+'">'+obj.name+'</option>';
                            }
                        }
                        
                    });
                    bindingOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>'+_optionsList);
                }
                else{
                  bindingOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>'); 
                }

                if(data.htmlFoldings.length > 0)
                {
                    var _output = data.htmlFoldings;
                    var _optionsList = '';
                    $.each(_output, function(i, val)
                    {
                        var obj = _output[i];
                        _optionsList += '<option value="'+obj.id+'">'+obj.name+'</option>';
                    });
                    foldingOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>'+_optionsList);
                }
                else{
                  foldingOptions.push('<option value="" disabled="disabled" selected="selected">'+_select_+'</option>');
                }
                $('#showPrice').html('');
            }
            else{
                $('#nextButton,#showPrice').html('');
                $('#loadingAttributes').hide();
            }
            
            $("#paperSizeHTML").html('<h4>'+paper_size+'</h4>'+paperSizeOptions.join(''));
             if(data.htmlGsm.length > 0)
             {
                 $("#paperWeightHTML").html('<h4>'+paper_weight+'</h4>'+paperWeightOptions.join(''));
             }
            $("#paperTypeHTML").html('<h4>'+paper_type+'</h4>'+paperTypeOptions.join(''));
            /*$("select[name='optPaperWeight']").html(paperWeightOptions.join(''));*/

            $("#paperColorHTML").html('<h4>'+color+'</h4>'+colorOptions.join(''));
            $("#paperSideHTML").html(sideOptions.join(''));
            $("select[name='optBindingOptions']").html(bindingOptions.join(''));
            $("select[name='optFoldingOptions']").html(foldingOptions.join(''));
        },
        error:function(data, statusText, xhr, wrapper){
          isRunning = null;  
        }
    });
}

$('body').on('click','input[name="optPaperColor"]',function(){
    var _value = $('input[name="optPaperColor"]:checked').val();
    if(_value != ''){
        var paperSize   = $('input[name="optPaperSize"]:checked').val();
        getPrintingPrice(paperSize,_value);
    }
});

$('body').on('click','input[name="optPaperSide"]',function(){
    var _value = $('input[name="optPaperSide"]:checked').val();
    if(_value != ''){
        calculatePrice();
    }
});

$('body').on('click','.clsPaperOptions',function(){
    var optType = $(this).data('select-opt');
    var _value = $(this).val();
    switch(optType){
        case 'size':
            if(_value == ''){
                /*$('.cls-paper-size').addClass('error-text-color');*/
            }
            else{
                /*$('.cls-paper-size').removeClass('error-text-color');*/
                var paperType   = $('input[name="optPaperType"]:checked').val();
                var paperWeight = $('input[name="optPaperWeight"]:checked').val();
                getPaperPrice(_value,paperType,paperWeight,'optPaperSize');
                var _color = $('input[name="optPaperColor"] option:selected').val();
                getPrintingPrice(_value,_color);
            }
        break;
        case 'type':
            if(_value == ''){
                /*$('.cls-paper-type').addClass('error-text-color');*/
            }
            else{
                /*$('.cls-paper-type').removeClass('error-text-color');*/
                var paperSize   = $('input[name="optPaperSize"]:checked').val();
                var paperWeight = $('input[name="optPaperWeight"]:checked').val();
                getPaperPrice(paperSize,_value,paperWeight,'optPaperType');
            }
        break;
        case 'weight':
            if(_value == ''){
                /*$('.cls-paper-weight').addClass('error-text-color');*/
            }
            else{
                /*$('.cls-paper-weight').removeClass('error-text-color');*/
                var paperSize   = $('input[name="optPaperSize"]:checked').val();
                var paperType   = $('input[name="optPaperType"]:checked').val();
                getPaperPrice(paperSize,paperType,_value,'optPaperWeight');
            }
        break;
    }
});

isRunningPrice = null;
function getPaperPrice(_size,_type,_weight,_eleID)
{
    $('input[name="txtPaperCost"]').val(0);
    if(_size != '' && _size != undefined && _type != '' && _type != undefined && _weight != '' && _weight != undefined)
    {
        isRunningPrice = $.ajax({
            headers:{'X-CSRF-Token': $('input[name="_token"]').val()},
            url : SITE_URL+'/user/get-paper-price/',
            type : "POST",
            dataType: 'JSON',
            data : {_size:_size,_type:_type,_weight:_weight},
            beforeSend:function(data, statusText, xhr, wrapper){
                if(isRunningPrice != null){
                    isRunningPrice.abort();
                }
                $('input[name="txtPaperCost"]').val(0);
            },
            success:function(data, statusText, xhr, wrapper){
                isRunningPrice = null;
                if(data.status == 'done'){
                }
                if(data.paperPrice <= 0){
                  $.alert.open('warning',warning,pprice_not_available_for_selected_optionp);
                  $('input[name="optPaperSize"]').prop('checked','');
                  $('input[name="optPaperType"]').prop('checked','');
                  $('input[name="optPaperWeight"]').prop('checked','');
                }
                $('input[name="txtPaperCost"]').val(data.paperPrice);
                calculatePrice();
            },
            error:function(data, statusText, xhr, wrapper){
              isRunningPrice = null;  
            }
        });
    }
}

var isPrintPrice = null;
function getPrintingPrice(_size,_color)
{
    $('input[name="txtPrintingCost"]').val(0);
    if(_size != '' && _color != '' && _color != undefined)
    {
        isPrintPrice = $.ajax({
            headers:{'X-CSRF-Token': $('input[name="_token"]').val()},
            url : SITE_URL+'/user/get-printing-price/',
            type : "POST",
            dataType: 'JSON',
            data : {_size:_size,_color:_color},
            beforeSend:function(data, statusText, xhr, wrapper){
                if(isPrintPrice != null){
                    isPrintPrice.abort();
                }
                $('input[name="txtPrintingCost"]').val(0);
            },
            success:function(data, statusText, xhr, wrapper){
                isPrintPrice = null;
                /*if(data.status == 'done'){
                }*/
                $('input[name="txtPrintingCost"]').val(data.printingPrice);
                calculatePrice();
            },
            error:function(data, statusText, xhr, wrapper){
              isPrintPrice = null;  
            }
        });
    }
}

$('body').on('change','select[name="optBindingOptions"]',function(){
    var _id = $('select[name="optBindingOptions"] option:selected').val();
    var totalPage = $('input[name="txtTotalPages"]').val();
    getBindingPrice(_id,totalPage);
});
var isBindingPrice = null;
function getBindingPrice(_id,numOfPage)
{
    $('input[name="txtBindingCost"]').val(0);
    if(_id != '' && _id != undefined)
    {
        isBindingPrice = $.ajax({
            headers:{'X-CSRF-Token': $('input[name="_token"]').val()},
            url : SITE_URL+'/user/get-binding-price-home/',
            type : "POST",
            dataType: 'JSON',
            data : {_id:_id,numOfPage:numOfPage},
            beforeSend:function(data, statusText, xhr, wrapper)
            {
                if(isBindingPrice != null){
                    isBindingPrice.abort();
                }
                $('input[name="txtBindingCost"]').val(0);
            },
            success:function(data, statusText, xhr, wrapper)
            {

                isBindingPrice = null;
                if(data.status == "done")
                {
                }
                $('input[name="txtBindingCost"]').val(data.bindingPrice);
                if(data.bindingPrice <= 0 && _id != 4)
                {
                  $.alert.open('warning',warning,pprice_for_selected_binding_option_is_not_availablep);
                }
                calculatePrice();
            },
            error:function(data, statusText, xhr, wrapper)
            {

                isBindingPrice = null;  
            }
        });
    }
}

$('body').on('change','select[name="optFoldingOptions"]',function(){
    var _id = $('select[name="optFoldingOptions"] option:selected').val();
    getFoldingPrice(_id);
});

var isFoldingPrice = null;
function getFoldingPrice(_id)
{
    $('input[name="txtFoldingCost"]').val(0);
    if(_id != '' && _id != undefined)
    {
        isFoldingPrice = $.ajax({
            headers:{'X-CSRF-Token': $('input[name="_token"]').val()},
            url : SITE_URL+'/user/get-folding-price/',
            type : "POST",
            dataType: 'JSON',
            data : {_id:_id},
            beforeSend:function(data, statusText, xhr, wrapper)
            {
                if(isFoldingPrice != null){
                    isFoldingPrice.abort();
                }
                $('input[name="txtFoldingCost"]').val(0);
            },
            success:function(data, statusText, xhr, wrapper)
            {
                isFoldingPrice = null;
                /*if(data.status == 'done')
                {}*/
                if(data.foldingPrice <= 0){
                  $.alert.open('warning',warning,pprice_for_selected_folding_option_is_not_awarning);
                  $('select[name="optFoldingOptions"]')[0].selectedIndex = 0;
                }
                $('input[name="txtFoldingCost"]').val(data.foldingPrice);
                calculatePrice();
            },
            error:function(data, statusText, xhr, wrapper)
            {
              isFoldingPrice = null;  
            }
        });
    }
}

$('body').on('click','.updateQuantity',function()
{
    /*var _qty = $('input[name="txtQuantity"]').val();*/
    var _numPages = $('input[name="txtTotalPages"]').val();
    var _mode = $(this).data('mode');
    /*console.log(_id);*/

    var _qty = $('#txtQuantity').val();
    console.log(_qty);
    if(_qty > 0 && _qty != '' && _numPages > 0 && _numPages != '')
    {
        if(_mode == 'increase')
        {

            _qty = parseInt(_qty) + 1;
            $('#txtQuantity').val(parseInt(_qty));
            var finalPrice = $('input[name="txtFinalPrice"]').val();
            var showPrice = parseFloat(finalPrice*_qty);
            $('#txtTotalCost').html('SAR '+accounting.toFixed(showPrice,2));
            $('input[name="txtQuantity"]').removeClass('error-text-color');
        }
        else{

            _qty -= 1;
            if(_qty > 0)
            {
                $('#txtQuantity').val(parseInt(_qty));
                var finalPrice = $('input[name="txtFinalPrice"]').val();
                var showPrice = parseFloat(finalPrice*_qty);
                $('#txtTotalCost').html('SAR '+accounting.toFixed(showPrice,2));
                $('input[name="txtQuantity"]').removeClass('error-text-color');
            }
        }
    }
    else{
        $('input[name="txtQuantity"]').addClass('error-text-color');
    }
});

$('body').on('click','.updatePages',function()
{
    var _qty = $('input[name="txtQuantity"]').val();
    var _mode = $(this).data('mode');
    /*console.log(_id);*/
    var _numPages = $('#txtTotalPages').val();

    //console.log(_qty);
    if(_numPages > 0 && _numPages != '' && _qty > 0 && _qty != '')
    {
        if(_mode == 'increase')
        {

            _numPages = parseInt(_numPages) + 1;
            $('#txtTotalPages').val(parseInt(_numPages));
            $('input[name="txtTotalPages"]').removeClass('error-text-color');
            calculatePrice();

        }
        else{

            _numPages -= 1;
            if(_numPages > 0)
            {
 
                $('#txtTotalPages').val(parseInt(_numPages));
                 $('#txtTotalPages').val(parseInt(_numPages));
                $('input[name="txtTotalPages"]').removeClass('error-text-color');
                calculatePrice();
            }
        }
    }
    else{
        $('#txtTotalCost').html('SAR 0.00');
        $('input[name="txtTotalPages"]').addClass('error-text-color');
    }
});

function calculatePrice()
{
    var numPages     = $('input[name="txtTotalPages"]').val();
    var _qty         = $('input[name="txtQuantity"]').val();
    var paperCost    = $('input[name="txtPaperCost"]').val();
    var printCost    = $('input[name="txtPrintingCost"]').val();
    var bindingCost  = $('input[name="txtBindingCost"]').val();
    var foldingCost  = $('input[name="txtFoldingCost"]').val();
    var paperSide    = $('input[name="optPaperSide"]:checked').val();

    var _paperPrice = 0;
    var _printPrice = 0;
    var finalPrice = 0;

    if(numPages > 0 && paperCost > 0 && printCost > 0 && paperSide != '' && paperSide != undefined)

    {
        _paperPrice = parseFloat(numPages) * parseFloat(paperCost);
            _printPrice = parseFloat(numPages) * parseFloat(printCost);
            finalPrice = parseFloat(_paperPrice) + parseFloat(_printPrice) + parseFloat(bindingCost) + parseFloat(foldingCost);
        //if(paperSide.trim() == 1)
        //{
        //    var halfPage = Math.round(parseFloat(numPages)/2);
        //    _paperPrice  = halfPage * parseFloat(paperCost);
        //    _printPrice = parseFloat(numPages) * parseFloat(printCost);
        //    finalPrice  = parseFloat(_paperPrice) + parseFloat(_printPrice) + parseFloat(bindingCost) + parseFloat(foldingCost);
            /*console.log('_paperPrice '+_paperPrice);
            console.log('_printPrice '+_printPrice);
            console.log('finalPrice '+finalPrice);*/
        //}
        //else
        //{
        //    _paperPrice = parseFloat(numPages) * parseFloat(paperCost);
        //    _printPrice = parseFloat(numPages) * parseFloat(printCost);
        //    finalPrice = parseFloat(_paperPrice) + parseFloat(_printPrice) + parseFloat(bindingCost) + parseFloat(foldingCost);
            /*console.log('_paperPrice '+_paperPrice);
            console.log('_printPrice '+_printPrice);
            console.log('finalPrice '+finalPrice);*/
        //}
    }
    $('input[name="txtFinalPrice"]').val(accounting.toFixed(finalPrice,2));
    $('#txtTotalCost').html('SAR '+accounting.toFixed(finalPrice,2));
    var showPrice = parseFloat(finalPrice*_qty)
    $('#txtTotalCost').html('SAR '+accounting.toFixed(showPrice,2));
}

$('body').on('change keyup blur','input[name="txtQuantity"]',function(){
  var _qty = $(this).val();
  var _numPages = $('input[name="txtTotalPages"]').val();
  if(_qty > 0 || _qty != '' || _numPages > 0 || _numPages != '')
  {
      var finalPrice = $('input[name="txtFinalPrice"]').val();
      var showPrice = parseFloat(finalPrice*_qty);
      $('#txtTotalCost').html('SAR '+accounting.toFixed(showPrice,2));
      $('input[name="txtQuantity"]').removeClass('error-text-color');
  }
  else{
    $('input[name="txtQuantity"]').addClass('error-text-color');
  }
});

$('body').on('change keyup blur','input[name="txtTotalPages"]',function(){
  var _numPages = $(this).val();
  var _qty = $('input[name="txtQuantity"]').val();
  if(_numPages > 0 || _numPages != '' || _qty > 0 || _qty != '')
  {
      $('input[name="txtTotalPages"]').removeClass('error-text-color');
      calculatePrice();
  }
  else{
    $('#txtTotalCost').html('SAR 0.00');
    $('input[name="txtTotalPages"]').addClass('error-text-color');
  }
});
