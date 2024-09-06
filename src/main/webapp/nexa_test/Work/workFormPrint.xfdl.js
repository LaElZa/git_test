(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("workFormPrint");
            this.set_titletext("New Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsForms", this);
            obj._setContents("<ColumnInfo><Column id=\"code\" type=\"STRING\" size=\"256\"/><Column id=\"value\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsForm", this);
            obj._setContents("<ColumnInfo><Column id=\"prefix\" type=\"STRING\" size=\"256\"/><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"title\" type=\"STRING\" size=\"256\"/><Column id=\"path\" type=\"STRING\" size=\"256\"/><Column id=\"image\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btnPrint",null,"45","65","25","10",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("Print");
            obj.set_cssclass("btn_WF_list01");
            this.addChild(obj.name, obj);

            obj = new Grid("grdFormPreview","10","btnPrint:10",null,null,"10","10",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_binddataset("dsForm");
            obj.set_treeusecheckbox("false");
            obj.set_cellsizingtype("col");
            obj.set_autofittype("col");
            obj.set_useselcolor("false");
            obj.set_readonly("true");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"145\"/><Column size=\"190\"/><Column size=\"145\"/><Column size=\"290\"/></Columns><Rows><Row size=\"50\"/><Row size=\"50\"/><Row size=\"50\"/><Row size=\"415\"/></Rows><Band id=\"body\"><Cell text=\"Prefix ID\" textAlign=\"center\" cssclass=\"cellTitle\" cursor=\"default\"/><Cell col=\"1\" text=\"bind:prefix\" cursor=\"default\"/><Cell col=\"2\" text=\"File Path\" textAlign=\"center\" cssclass=\"cellTitle\" cursor=\"default\"/><Cell col=\"3\" text=\"bind:path\" wordWrap=\"char\" cursor=\"default\"/><Cell row=\"1\" text=\"Form ID\" textAlign=\"center\" cssclass=\"cellTitle\" cursor=\"default\"/><Cell row=\"1\" col=\"1\" text=\"bind:id\" cursor=\"default\"/><Cell row=\"1\" col=\"2\" text=\"Form Title\" textAlign=\"center\" cssclass=\"cellTitle\" cursor=\"default\"/><Cell row=\"1\" col=\"3\" text=\"bind:title\" cursor=\"default\"/><Cell row=\"2\" colspan=\"4\" text=\"Form Design\" textAlign=\"center\" cssclass=\"cellTitle\" cursor=\"default\"/><Cell row=\"3\" colspan=\"4\" text=\"bind:image\" displaytype=\"imagecontrol\" imagestretch=\"fixaspectratio\" cursor=\"default\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("stTitle","10","5",null,"35","205",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("Form Print");
            obj.set_cssclass("sta_WF_title01");
            this.addChild(obj.name, obj);

            obj = new Static("stTitle00","10","45","55","25",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("Form ID");
            obj.set_cssclass("sta_cm_text12L");
            this.addChild(obj.name, obj);

            obj = new Combo("cmbFormID","71","45",null,"25","btnPrint:20",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_innerdataset("dsForms");
            obj.set_codecolumn("code");
            obj.set_datacolumn("value");
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
        this.addIncludeScript("workFormPrint.xfdl","Lib::libComm.xjs");
        this.registerScript("workFormPrint.xfdl", function() {
        this.executeIncludeScript("Lib::libComm.xjs"); /*include "Lib::libComm.xjs"*/;

        this.objJSON;

        /*******************************************************************************************************************************
        	 nexacrostudio.request

        	 syntax 		: nexacrostudio.request( requestType, dataobjectID = null );
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
        /*******************************************************************************************************************************
        	 nexacrostudio.getFormImage

        	 syntax 		: nexacrostudio.getFormImage( strFormUrl );
        	 description	: This is a method to request the form image data of the project being developed in nexacrostudio.
        	 return 		: Returns the image data of the form in string type.
        	 ___________________________________________________________________________________________________________________________
        	 strFormUrl : Form prefixurl to get image data.

        ********************************************************************************************************************************/
        this.workFormPrint_onload = function(obj,e)
        {
        	this.fnGridOnSize(this.grdFormPreview.getOffsetWidth(), this.grdFormPreview.getOffsetHeight());

        	var sRtn = nexacrostudio.request(requesttype.forms);
        	if (sRtn)
        	{
        		this.objJSON = JSON.parse(sRtn);
        		this.fnMakeFormsData();
        	}
        };

        this.cmbFormID_onitemchanged = function(obj,e)
        {
        	this.fnMakeSelectFormData(e.postindex);
        };

        this.fnMakeFormsData = function()
        {
        	var arrForms = this.objJSON.forms;
        	var objForm;

        	var nRow;
        	var sPrefix;
        	var sFormId;
        	var sFormTitle;

        	this.dsForms.clearData();
        	this.dsForms.set_enableevent(false);

        	nRow = this.dsForms.addRow();
        	this.dsForms.setColumn(nRow, "code", "-1");
        	this.dsForms.setColumn(nRow, "value", "Select Form ID");

        	for (var i = 0; i < arrForms.length; i++)
        	{
        		objForm = arrForms[i];
        		sPrefix = objForm.prefixurl;
        		sFormTitle = this.gfnFindValue(objForm.properties, "name", "titletext", "value");

        		nRow = this.dsForms.addRow();
        		this.dsForms.setColumn(nRow, "code", sPrefix);
        		this.dsForms.setColumn(nRow, "value", sPrefix + " - " + sFormTitle);
        	}

        	this.dsForms.set_enableevent(true);

        	this.cmbFormID.set_index(0);
        }

        this.fnMakeSelectFormData = function(nIdx)
        {
        	if (nIdx == 0)
        	{
        		this.dsForm.clearData();
        		this.dsForm.addRow();
        	}
        	else
        	{
        		var objForm = this.objJSON.forms[nIdx-1];

        		var sPrefixUrl = objForm.prefixurl;
        		var sPrefixID = sPrefixUrl.split("::")[0];
        		var sFormId = objForm.id;
        		var sFormTitle = this.gfnFindValue(objForm.properties, "name", "titletext", "value");;
        		var sFormPath = objForm.filepath;

        		// get image data of form
        		var sImage = nexacrostudio.getFormImage(sPrefixUrl);

        		this.dsForm.clearData();
        		this.dsForm.set_enableevent(false);

        		nRow = this.dsForm.addRow();
        		this.dsForm.setColumn(nRow, "prefix", sPrefixID);
        		this.dsForm.setColumn(nRow, "id", sFormId);
        		this.dsForm.setColumn(nRow, "title", sFormTitle);
        		this.dsForm.setColumn(nRow, "path", sFormPath);
        		this.dsForm.setColumn(nRow, "image", sImage);

        		this.dsForm.set_enableevent(true);
        	}
        }

        this.btnExportExcel_onclick = function(obj,e)
        {
        	system.print(this.grdFormPreview, false, "middle", "center", "true", "landscape");
        };

        this.grdFormPreview_onsize = function(obj,e)
        {
        	this.fnGridOnSize(e.cx, e.cy);
        };

        this.fnGridOnSize = function(nX, nY)
        {
        	var nHeight = nY - 153;
        	this.grdFormPreview.setFormatRowProperty(3, "size", nHeight);
        }
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.workFormPrint_onload,this);
            this.btnPrint.addEventHandler("onclick",this.btnExportExcel_onclick,this);
            this.grdFormPreview.addEventHandler("onsize",this.grdFormPreview_onsize,this);
            this.cmbFormID.addEventHandler("onitemchanged",this.cmbFormID_onitemchanged,this);
        };
        this.loadIncludeScript("workFormPrint.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
