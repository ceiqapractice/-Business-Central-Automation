codeunit 50143 HomologationValidationFlow
{
    Subtype = Test;

    /*This test Validates the customer homologation table Customer No and Item Category Code fields with the 
    Valid Customer No and Valid Item Category Code */
    [Test]
    procedure ValidCustomerandItemCode()
    var
        homologationrec: Record "Customer homologation";
        homorec: Record "Customer homologation";
        No: Code[20];
        ItemCode: Code[20];
        Expirationdate: Date;

    begin
        No := 'C03200';
        ItemCode := 'CHAIR';
        Expirationdate := 20220625D;
        homologationrec."Customer no." := No;
        homologationrec."Item category code" := ItemCode;
        homologationrec."Expiration date" := Expirationdate;
        if HomologationValidationMethod(No, ItemCode, Expirationdate) then begin
            homologationrec.Insert(true);
        end;
        if homorec.find('=') then
            Error('Customer Homologation Record Was not Created with Valid Customer No. %1 and valid Item Code %2', homologationrec."Customer no.", homologationrec."Item category code");
    end;

    /*This test Validates the customer homologation table Customer No and Item Category Code fields with the 
   InValid Customer No and Valid Item Category Code */
    [Test]
    procedure InValidCustomerandvalidItemCode()
    var
        homologationrec: Record "Customer homologation";
        No: Code[20];
        ItemCode: Code[20];
        Expirationdate: Date;

    begin
        No := 'C12345';
        ItemCode := 'CHAIR';
        Expirationdate := 20220625D;
        homologationrec."Customer no." := No;
        homologationrec."Item category code" := ItemCode;
        homologationrec."Expiration date" := Expirationdate;
        if HomologationValidationMethod(No, ItemCode, Expirationdate) then begin
            homologationrec.Insert(true);
        end;
        if homologationrec.find('=') then
            Error('Customer Homologation Record Was Created with InValid Customer No. %1 and valid Item Code %2', homologationrec."Customer no.", homologationrec."Item category code");
    end;

    /*This test Validates the customer homologation table Customer No and Item Category Code fields with the 
    Valid Customer No and InValid Item Category Code */
    [Test]
    procedure ValidCustomerandInvalidItemCode()
    var
        homologationrec: Record "Customer homologation";
        No: Code[20];
        ItemCode: Code[20];
        Expirationdate: Date;

    begin
        No := 'C03200';
        ItemCode := 'CHAIRRRRR';
        Expirationdate := 20220625D;
        homologationrec."Customer no." := No;
        homologationrec."Item category code" := ItemCode;
        homologationrec."Expiration date" := Expirationdate;
        if HomologationValidationMethod(No, ItemCode, Expirationdate) then begin
            homologationrec.Insert();
        end;
        if homologationrec.find('=') then
            Error('Customer Homologation Record Was Created with Valid Customer No. %1 and Invalid Item Code %2', homologationrec."Customer no.", homologationrec."Item category code");
    end;

    /*This test Validates the customer homologation table Customer No and Item Category Code fields with the 
    InValid Customer No and InValid Item Category Code */
    [Test]
    procedure InvalidCustomerandItemCode()
    var
        homologationrec: Record "Customer homologation";
        No: Code[20];
        ItemCode: Code[20];
        Expirationdate: Date;

    begin
        No := 'C12345';
        ItemCode := 'CHAIRRREE';
        Expirationdate := 20220625D;
        homologationrec."Customer no." := No;
        homologationrec."Item category code" := ItemCode;
        homologationrec."Expiration date" := Expirationdate;
        if HomologationValidationMethod(No, ItemCode, Expirationdate) then begin
            homologationrec.Insert(true);
        end;
        if homologationrec.find('=') then
            Error('Customer Homologation Record Was Created with InValid Customer No. %1 and Invalid Item Code %2', homologationrec."Customer no.", homologationrec."Item category code");
    end;

    [TryFunction]
    local procedure HomologationValidationMethod(No: Code[20]; ItemCode: Code[20]; ExpirationDate: Date)
    var
        homologationrec: Record "Customer homologation";
    begin
        homologationrec.Init();
        homologationrec.Validate("Customer no.", No);
        homologationrec.Validate("Item category code", ItemCode);
        homologationrec.Validate("Expiration date", ExpirationDate);
    end;
}