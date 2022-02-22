Install-Module -name vmware.powercli -Scope CurrentUser
echo 'Install VMWare'

Set-ExecutionPolicy remotesigned -Confirm:$false -Scope CurrentUser
echo 'Execute'

Set-PowerCLIConfiguration -InvalidCertificateAction Prompt -Confirm:$false

echo 'PassPowerCLI'

Connect-VIServer -Server 10.25.1.4 -user root -Password Rajah424!
echo 'Connection Success!'

Get-VM -Name Win10Test
echo 'VM Setup!'