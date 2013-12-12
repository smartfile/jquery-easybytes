(function($){
    /* requires jquery 1.2 */

    function roundToTwoPlaces(n){
        return Math.round(n * 100 + ((n * 1000) % 10 > 4 ? 1:0)) / 100;
    }

    function returnValue(easybytes, settings){
        var rtnValue = 0,
        // Retrieve amount from text field
            amt = easybytes.next('.easybytes-input').val(),
        // Retrieve power from selected value
            pwr = easybytes.nextAll('.easybytes-select').val();
        // Convert the return value to a power of settings.multiple[1024]
        pwr == '0' ? rtnValue = parseInt(amt) : rtnValue =  parseFloat(amt) * Math.pow(settings.multiple, parseFloat(pwr));
        // Add new amount to the parent input field
        if(!isNaN(rtnValue)){
            return parseInt(rtnValue, 10);
        } else {
            return '';
        }
    }

    function displayValue(easybytes, bytes, settings){
        var i = Math.min(4, Math.floor(Math.log(bytes) / Math.log(settings.multiple)), 10),
            amt = roundToTwoPlaces(bytes / Math.pow(settings.multiple, i));
        if(isNaN(amt)){
            amt = '';
            i = settings.defaultUnit;
        }
        easybytes
            .next('.easybytes-input')
                .val(amt)
            .next('.easybytes-select')
                .val(i);
        easybytes
            .val(returnValue(easybytes, settings));
    }

    var methods = {
        init: function(options){
            var $this = $(this),
                tid = $this.attr('id'),
                bytes = $this.val(),
                plh = '',
                sz = '',
                sizes = ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Terabytes'],
                settings = $.extend( {
                    'multiple' : 1024,
                    'abbr' : false,
                    'defaultUnit' : 3,
                    'ids' : true,
                    'inputClass' : false,
                    'selectClass' : false
                }, options),
                sz = '<select' + (settings.ids? ' id="sel_' + tid + '"' : '') + ' class="easybytes-select' +
                    (settings.inputClass ? ' ' + settings.inputClass : '') + '">';

            if(settings.abbr){
                sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            }
            $.each(sizes, function(i, v){
                sz += '<option value="' + i + '">' + v + '</option>';
            });
            sz += '</select>';

            $this.addClass('easybytes'); // Hide original field

            // Copy any existing placeholder to our widget
            if(typeof $this.attr('placeholder') !== 'undefined'){
                plh =  ' placeholder="' + $this.attr('placeholder') + '"';
            }

            // Create the new input fields
            $this
                .after('<input type="text"' + (settings.ids? ' id="txt_' + tid + '"' : '') + ' class="easybytes-input' +
                    (settings.inputClass ? ' ' + settings.inputClass : '') + '" ' + plh + '/>' + sz);

            // If the field is prepopulated with a number
            // Set the dropdown to the correct selection
            if(typeof bytes !== 'undefined' && bytes.length > 1){
                if(!isNaN(bytes)){
                    displayValue($this, bytes, settings);
                }
            } else {
                displayValue($this, '', settings);
            }

            $this.next('.easybytes-input')
                .keydown( function(e){
                    // Block non-numeric and non-navigation keys in widget
                    var key = e.charCode || e.keyCode || 0;
                    // Allow only the keys listed below
                    return (
                        key === 8 ||   // backspace
                        key === 9 ||   // tab
                        key === 37 ||  // left arrow
                        key === 39 ||  // right arrow
                        key === 46 ||  // delete
                        key === 110 || // decimal point
                        key === 190 || // period
                        (key >= 48 && key <= 57) ||
                        (key >= 96 && key <= 105)
                    );
                })
                .keyup(function(){
                    $this.val(returnValue($this, settings));
                })
                .next('.easybytes-select')
                    .change( function(){
                        // If the select changes, update the value
                        $this.val(returnValue($this, settings));
                    })
                    .on('addErrorClass', function(e, v){
                        $('#' + v.id.replace('sel','txt')).addClass('error');
                    })
                    .on('removeErrorClass', function(e, v){
                        $('#' + v.id.replace('sel','txt')).removeClass('error');
                    });
        },
        value: function(bytes){
            var $this = $(this);
            displayValue($this, bytes);
        }
    };

    $.fn.easybytes = function(method){
        if(methods[method]){
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }else if(typeof method === 'object' || ! method){
            return methods.init.apply(this, arguments);
        }else{
            $.error('Method ' +  method + ' does not exist on jQuery.easybytes');
        }
    };
})(jQuery);