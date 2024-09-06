(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("workAll");
            this.set_titletext("All Information");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsAll", this);
            obj._setContents("");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btnSearch",null,"10","75","25","10",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("Search");
            obj.set_cssclass("btn_WF_search01");
            this.addChild(obj.name, obj);

            obj = new TextArea("txAll","10","btnSearch:10",null,null,"10","10",null,null,null,null,this);
            obj.set_taborder("1");
            this.addChild(obj.name, obj);

            obj = new Static("stTitle","10","5",null,"35","btnSearch:10",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("All Information");
            obj.set_cssclass("sta_WF_title01");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",800,600,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("workAll.xfdl", function() {
        /*******************************************************************************************************************************
        	 nexacrostudio.request

        	 syntax 		: nexacrostudio.request( requestType, dataobjectID = null);
        	 description	: request the project information being developed in nexacrostudio
        					  and receive it as the data property value of Dataobject.
        	 return 		: Information requested according to requestType is returned in the form of Json format string.
        	 ___________________________________________________________________________________________________________________________
        	 requestType	:
        		1) requesttype.all									11) requesttype.services
        		2) requesttype.general								12) requesttype.protocoladaptors
        		3) requesttype.environment							13) requesttype.deviceadaptors
        		4) requesttype.screeninfo							14) requesttype.applicationvariables
        		5) requesttype.env_variables						15) requesttype.app_datasets
        		6) requesttype.env_cookies							16) requesttype.app_variables
        		7) requesttype.env_httpheader						17) requesttype.app_dataobjects
        		8) requesttype.typedefinition						19) requesttype.applications
        		9) requesttype.modules								20) requesttype.forms
        		10) requesttype.objects

        	 dataobjectID : Set the ID of the DataObject to which the requested information will be reflected according to requestType.

        ********************************************************************************************************************************/

        this.btnSearch_onclick = function(obj,e)
        {
        	// request all information of nexacrostudio project
        	var sRtn = nexacrostudio.request(requesttype.all);

        	this.txAll.set_value(sRtn);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.btnSearch.addEventHandler("onclick",this.btnSearch_onclick,this);
        };
        this.loadIncludeScript("workAll.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
