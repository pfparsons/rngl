def schema:
  def isdate($v):   $v | test("[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]");
  def array($k;$v): {"name":$k,"type":"RECORD",mode:"REPEATED","fields":($v[0] | schema)};
  def date($k):     {"name":$k,"type":"DATE",  mode:"NULLABLE"};
  def string($k):   {"name":$k,"type":"STRING",mode:"NULLABLE"};
  def item($k;$v):
     $v | if   type == "array"                 then array($k;$v)
          elif type == "string" and isdate($v) then date($k)
          elif type == "string"                then string($k)
      else empty end;
  [ to_entries[] | item(.key;.value) ]
;
schema