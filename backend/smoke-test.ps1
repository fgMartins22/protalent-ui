$ErrorActionPreference = "Stop"
$base = "http://localhost:3333"
$log = "$env:TEMP\pt_smoke.txt"
"" | Set-Content $log
function L($m){ Add-Content $log $m }

try {
  $h = Invoke-RestMethod "$base/health/database"
  L ("DB: " + ($h | ConvertTo-Json -Compress))

  $p = Invoke-RestMethod "$base/profiles" -Method Post -ContentType "application/json" -Body (@{
    first_name="Teste"; last_name="Smoke"; email="smoke@test.dev"; title="Dev"
  } | ConvertTo-Json)
 $profileId = $p.id
  L ("PROFILE_CREATED id=" + $profileId)

  $p2 = Invoke-RestMethod "$base/profiles/$profileId" -Method Put -ContentType "application/json" -Body (@{ city="São Paulo" } | ConvertTo-Json)
  L ("PROFILE_UPDATED city=" + $p2.city)

  $exp = Invoke-RestMethod "$base/profiles/$profileId/experiences" -Method Post -ContentType "application/json" -Body (@{
    role="Dev"; company="X"; start_date="2022-01"; current=$true
  } | ConvertTo-Json)
  L ("EXP_CREATED id=" + $exp.id + " end_date=" + ($exp.end_date | Out-String).Trim())

  $edu = Invoke-RestMethod "$base/profiles/$profileId/educations" -Method Post -ContentType "application/json" -Body (@{
    course="ADS"; institution="XYZ"; start_date="2019-01"; end_date="2021-12"
  } | ConvertTo-Json)
  L ("EDU_CREATED id=" + $edu.id)

  $sk = Invoke-RestMethod "$base/profiles/$profileId/skills" -Method Post -ContentType "application/json" -Body (@{ name="React" } | ConvertTo-Json)
  L ("SKILL_CREATED id=" + $sk.id)

  try {
    Invoke-RestMethod "$base/profiles/$profileId/skills" -Method Post -ContentType "application/json" -Body (@{ name="React" } | ConvertTo-Json) | Out-Null
    L "SKILL_DUP: NAO bloqueou (inesperado)"
  } catch {
    L ("SKILL_DUP: " + $_.ErrorDetails.Message)
  }

  $r = Invoke-RestMethod "$base/profiles/$profileId/resumes" -Method Post -ContentType "application/json" -Body (@{ name="Currículo Teste" } | ConvertTo-Json)
  L ("RESUME_CREATED id=" + $r.id + " layout=" + $r.layout + " status=" + $r.status + " output=" + $r.output_type)

  $list = Invoke-RestMethod "$base/profiles/$profileId/resumes"
  L ("RESUME_LIST count=" + $list.Count)

  $r2 = Invoke-RestMethod "$base/resumes/$($r.id)" -Method Put -ContentType "application/json" -Body (@{ layout="modern"; status="updated" } | ConvertTo-Json)
  L ("RESUME_UPDATED layout=" + $r2.layout + " status=" + $r2.status)

  Invoke-RestMethod "$base/resumes/$($r.id)" -Method Delete | Out-Null
  L "RESUME_DELETED"

  # Limpeza: remover profile (cascade)
  Invoke-RestMethod "$base/profiles/$profileId" -Method Delete | Out-Null
  L "PROFILE_DELETED (cleanup)"

  L "SMOKE_OK"
} catch {
  L ("SMOKE_FAIL: " + $_.Exception.Message + " | " + $_.ErrorDetails.Message)
}
