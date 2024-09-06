(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("workForms");
            this.set_titletext("Forms Information");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsForms", this);
            obj._setContents("<ColumnInfo><Column id=\"prefix\" type=\"STRING\" size=\"256\"/><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"title\" type=\"STRING\" size=\"256\"/><Column id=\"path\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
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

            obj = new Grid("grdForms","10","btnSearch:10",null,null,"10","10",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("dsForms");
            obj.set_treeusecheckbox("false");
            obj.set_cellsizingtype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"100\"/><Column size=\"150\"/><Column size=\"150\"/><Column size=\"400\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"prefix\"/><Cell col=\"1\" text=\"id\"/><Cell col=\"2\" text=\"title\"/><Cell col=\"3\" text=\"path\"/></Band><Band id=\"body\"><Cell text=\"bind:prefix\" suppress=\"1\"/><Cell col=\"1\" text=\"bind:id\"/><Cell col=\"2\" text=\"bind:title\"/><Cell col=\"3\" text=\"bind:path\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("stTitle","10","5",null,"35","btnSearch:10",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("Forms Information");
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
        this.addIncludeScript("workForms.xfdl","Lib::libComm.xjs");
        this.registerScript("workForms.xfdl", function() {
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
        	// request forms information of nexacrostudio project
        	var sRtn = nexacrostudio.request(requesttype.forms);
        	var objJSON = JSON.parse(sRtn);

        	this.fnMakeFormsData(objJSON);
        };

        this.fnMakeFormsData = function(objJSON)
        {
        	var arrForms = objJSON.forms;
        	var objForm;

        	var nRow;
        	var sPrefixUrl;
        	var sPrefixId;
        	var sFormId;
        	var sFormTitle;
        	var sFormPath;
        	var arrFormPath;

        	this.dsForms.clearData();
        	this.dsForms.set_enableevent(false);

        	for (var i = 0; i < arrForms.length; i++)
        	{
        		objForm = arrForms[i];
        		sFormId = objForm.id;
        		sFormTitle = this.gfnFindValue(objForm.properties, "name", "titletext", "value");
        		sPrefixUrl = objForm.prefixurl;
        		sPrefixId = sPrefixUrl.split("::")[0];

        		nRow = this.dsForms.addRow();
        		this.dsForms.setColumn(nRow, "prefix", sPrefixId);
        		this.dsForms.setColumn(nRow, "id", sFormId);
        		this.dsForms.setColumn(nRow, "title", sFormTitle);
        		this.dsForms.setColumn(nRow, "path", sFormPath);
        	}

        	this.dsForms.set_enableevent(true);

        	if (this.dsForms.getRowCount() > 0)
        	{
        		this.grdForms.selectRow(0);
        	}
        }

        this.btnExportCSV_onclick = function(obj,e)
        {
        	this.gfnExportCSV("FormsInformation.csv", this.grdForms);
        };

        this.btnExportExcel_onclick = function(obj,e)
        {
        	this.gfnExportExcel("FormsInformation", this.grdForms);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.btnSearch.addEventHandler("onclick",this.btnSearch_onclick,this);
            this.btnExportCSV.addEventHandler("onclick",this.btnExportCSV_onclick,this);
            this.btnExportExcel.addEventHandler("onclick",this.btnExportExcel_onclick,this);
        };
        this.loadIncludeScript("workForms.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
