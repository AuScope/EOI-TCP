/**
 * Builds a form panel for generic gsml:Borehole filters
 * @param {number} id of this formpanel instance
 * @param {string} the service url for submit
 */

BoreholeFilterForm = function(id,activeLayersRecord) {

    this.isFormLoaded = true; //We aren't reliant on any remote downloads

    var serviceEndpoints=activeLayersRecord.getServiceEndpoints();
    var cswRecords=activeLayersRecord.getCSWRecords();
    var administrativeAreas=[];

    if(serviceEndpoints != null  && serviceEndpoints!= undefined){
        for(i=0;i<serviceEndpoints.length;i++){
            for(j=0;j<cswRecords.length;j++){
                var cswRecord=cswRecords[j].getFilteredOnlineResources(undefined,undefined,undefined,serviceEndpoints[i],false)
                if(cswRecord.length>0){
                    administrativeAreas.push([cswRecords[j].getAdministrativeArea(),serviceEndpoints[i]]);
                    break;
                }
            }
        }
    };

    var serviceFilterText=new Ext.form.TextField({
        itemId     : 'serviceFilterText-field',
        fieldLabel : 'serviceFilterText',
        name       : 'serviceFilterText',
        hidden     : true
    });

     // create the combo instance
    var serviceCombo = new Ext.form.ComboBox({
        anchor     : '95%',
        itemId     : 'serviceFilter-field',
        fieldLabel : 'Provider',
        name       : 'serviceFilter',
        typeAhead: true,
        triggerAction: 'all',
        lazyRender:true,
        mode: 'local',
        store: new Ext.data.ArrayStore({
            id: 0,
            fields: [
                'displayText',
                'serviceFilter'
            ],
            data: administrativeAreas
        }),
        valueField: 'serviceFilter',
        displayField: 'displayText',
        hiddenName: 'serviceFilter'
    });

    if(!serviceEndpoints){
        serviceCombo=[];
    }

    BoreholeFilterForm.superclass.constructor.call(this, {
        id          : String.format('{0}',id),
        border      : false,
        autoScroll  : true,
        hideMode    :'offsets',
        width       :'100%',
        buttonAlign :'right',
        labelAlign  :'right',
        labelWidth  : 70,
        timeout     : 180, //should not time out before the server does
        bodyStyle   :'padding:5px',
        autoHeight: true,
        items       : [{
            xtype      :'fieldset',
            itemId     : 'borehole-fieldset',
            title      : 'Borehole Filter Properties',
            autoHeight : true,
            items      : [
            {
                anchor     : '95%',
                itemId     : 'name-field',
                xtype      : 'textfield',
                fieldLabel : 'Name',
                name       : 'boreholeName'
            },
            {
                anchor     : '95%',
                itemId     : 'drillingdate-field',
                xtype      : 'textfield',
                fieldLabel : 'Date',
                name       : 'dateOfDrilling'
            },
            serviceCombo
            ]
        }]
    });
    //return thePanel;
};

Ext.extend(BoreholeFilterForm, BaseFilterForm, {

});
