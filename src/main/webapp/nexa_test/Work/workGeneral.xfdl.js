(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("workGeneral");
            this.set_titletext("General Information");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsGeneral", this);
            obj.set_binddataobject("g_do_info_files");
            obj.set_dataobjectpath("$.general file information[*]");
            obj._setContents("<ColumnInfo><Column id=\"filename\" type=\"STRING\" size=\"256\" datapath=\"@.filename\"/><Column id=\"filetype\" type=\"STRING\" size=\"256\" datapath=\"@.filetype\"/><Column id=\"filepath\" type=\"STRING\" size=\"256\" datapath=\"@.filepath\"/><Column id=\"date\" type=\"STRING\" size=\"256\" datapath=\"@.lastmodified\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btnSearch",null,"10","75","25","220",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("Search");
            obj.set_cssclass("btn_WF_search01");
            this.addChild(obj.name, obj);

            obj = new Button("btnExportCSV",null,"10","95","25","120",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("Export CSV");
            obj.set_cssclass("btn_WF_save01");
            this.addChild(obj.name, obj);

            obj = new Button("btnExportExcel",null,"10","105","25","10",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("Export Excel");
            obj.set_cssclass("btn_WF_excel01");
            this.addChild(obj.name, obj);

            obj = new Grid("grdGeneral","10","btnSearch:10",null,null,"10","10",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("dsGeneral");
            obj.set_autofittype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"150\" band=\"left\"/><Column size=\"80\" band=\"left\"/><Column size=\"80\"/><Column size=\"120\" band=\"right\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"filename\"/><Cell col=\"1\" text=\"filetype\"/><Cell col=\"2\" text=\"filepath\"/><Cell col=\"3\" text=\"date\"/></Band><Band id=\"body\"><Cell text=\"bind:filename\"/><Cell col=\"1\" text=\"bind:filetype\" textAlign=\"center\"/><Cell col=\"2\" text=\"bind:filepath\"/><Cell col=\"3\" text=\"bind:date\" textAlign=\"center\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("stTitle","10","5",null,"35","btnSearch:10",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("General Information");
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
        this.addIncludeScript("workGeneral.xfdl","Lib::libComm.xjs");
        this.registerScript("workGeneral.xfdl", function() {
        this.executeIncludeScript("Lib::libComm.xjs"); /*include "Lib::libComm.xjs"*/;

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
        	var objDataObj = nexacro.getApplication().all["g_do_info_files"];

        	if (objDataObj == null)
        		return;

        	// request file information of nexacrostudio project
        	nexacrostudio.request(requesttype.general, objDataObj.id);
        	this.dsGeneral.loadFromDataObject();
        };

        this.btnExportCSV_onclick = function(obj,e)
        {
        	this.gfnExportCSV("GeneralInformation.csv", this.grdGeneral);
        };

        this.btnExportExcel_onclick = function(obj,e)
        {
        	this.gfnExportExcel("GeneralInformation.xls", this.grdGeneral);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.btnSearch.addEventHandler("onclick",this.btnSearch_onclick,this);
            this.btnExportCSV.addEventHandler("onclick",this.btnExportCSV_onclick,this);
            this.btnExportExcel.addEventHandler("onclick",this.btnExportExcel_onclick,this);
        };
        this.loadIncludeScript("workGeneral.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
