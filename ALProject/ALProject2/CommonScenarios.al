codeunit 50145 CommonScenariosFlow
{
    Subtype = Test;

    [Test]
    procedure Customercreation()
    var
        Custrec: Record "Customer";
    begin
        CustRec."No." := 'C00130';
        Custrec.Name := 'TestCustomer';
        Custrec.Address := 'Alandur';
        Custrec."Credit Limit (LCY)" := 17.00;
        Custrec."Address 2" := 'Chennai';
        Custrec.City := 'Chennai';
        Custrec.Contact := 'Demo Contact';
        Custrec."Tax Area Code" := 'ATLANTA, GA';
        Custrec."Customer Disc. Group" := 'RETAIL';
        Custrec."Allow Line Disc." := true;
        Custrec."Country/Region Code" := 'US';
        Custrec."Tax Liable" := true;
        Custrec."Payment Terms Code" := 'CM';
        Custrec."Location Code" := 'MAIN';
        Custrec."Combine Shipments" := true;
        Custrec.Insert(true);
    end;

    [Test]
    procedure CustomerEdit()
    var
        CustRec: Record "Customer";
    begin
        CustRec.Get('C00130');
        Custrec.Name := 'ReplacedTestCustomer';
        CustRec.Address := 'Adambakkam';
        CustRec.Modify;
    end;

    [Test]
    procedure CustomerDelete()
    var
        CustomerCard: TestPage "Customer card";
        CustRec: Record Customer;
    begin
        CustRec."No." := 'C00130';
        CustRec.Delete();
    end;

    [Test]
    procedure Vendorcreation()
    var
        VendorCard: TestPage "Vendor card";
        VendorRec: Record "Vendor";
        MycustomENUM: Enum "Vendor Blocked";
    begin
        VendorRec."No." := 'V00040';
        VendorRec.Name := 'TestVendor';
        VendorRec.City := 'Chennai';
        VendorRec.Address := 'Mexico';
        MycustomENUM := MycustomENUM::Payment;
        VendorRec.Blocked := MycustomENUM;
        VendorRec."Tax Area Code" := 'ATLANTA, GA';
        VendorRec."Payment Method Code" := 'CASH';
        VendorRec."Location Code" := 'MAIN';
        VendorRec."Shipment Method Code" := 'DAF';
        VendorRec.Insert(true);
    end;

    [Test]
    procedure VendorEdit()
    var
        VendorRec: Record "Vendor";
    begin
        VendorRec.Get('V00040');
        VendorRec.Name := 'ReplacedVendor';
        VendorRec.City := 'SingaraChennai';
        VendorRec.Modify;
    end;

    [Test]
    procedure VendorDelete()
    var
        Vendorslist: TestPage "Vendor list";
        VendorRec: Record "Vendor";

    begin
        VendorRec."No." := 'V00040';
        VendorRec.Delete();
    end;

    [Test]
    procedure VendorNameAssertEquals()
    var
        Vendorslist: TestPage "Vendor list";
        VendorRec: Record "Vendor";

    begin
        Vendorslist.OpenView();
        VendorRec."No." := '40000';
        Vendorslist.GoToRecord(VendorRec);
        Vendorslist.Name.AssertEquals('Wide World Importers');
    end;

    [Test]
    procedure VendorNameAssertNotEquals()
    var
        Vendorslist: TestPage "Vendor list";
        VendorRec: Record "Vendor";

    begin
        Vendorslist.OpenView();
        VendorRec."No." := '40000';
        Vendorslist.GoToRecord(VendorRec);
        ASSERTERROR Vendorslist.Name.AssertEquals('Wide World Importerssss');
    end;

    [Test]
    procedure PaymentTermsaddition()
    var
        PaymentTerms: TestPage "Payment Terms";
        PaymentTermsRec: Record "Payment Terms";

    begin
        PaymentTerms.OpenNew();
        PaymentTerms.new();
        PaymentTerms.Code.SetValue('CHK');
        PaymentTerms."Due Date Calculation".SetValue('101D');
        PaymentTerms."Discount Date Calculation".SetValue('7D');
        PaymentTerms.Description.SetValue('Test Description done through automation');
    end;

    [Test]
    procedure PaymentTermsdeletion()
    var
        PaymentTerms: TestPage "Payment Terms";
        PaymentTermsRec: Record "Payment Terms";
    begin
        PaymentTerms.OpenNew();
        PaymentTerms.new();
        PaymentTermsRec.Code := 'CHK';
        PaymentTermsRec.Delete();
    end;

}
