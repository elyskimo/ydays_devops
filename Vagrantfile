# -*- mode: ruby -*-
# vi: set ft=ruby :
Vagrant.require_version ">= 1.6.5"
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  # an alternative to this Ubuntu 14.04 box is the "v0rtex/xenial64" with the 16.04 LTS
  config.vm.box = "ubuntu/xenial64"
  # access a port on your host machine (via localhost) and have all data forwarded to a port on the guest machine.
  config.vm.network "forwarded_port", guest: 8088, host: 8088
  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.188.110"
  #define a larger than default (40GB) disksize
  config.disksize.size = '50GB'

  config.vm.provider "virtualbox" do |vb|
    vb.name = 'docker-compose-vm'
    vb.memory = 4096
    vb.cpus = 1
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end

  config.vm.provision "shell",
  inline: "apt-get "

  # set up Docker in the new VM:
  config.vm.provision :docker
  # config.vm.provision :docker, version: "18.06.2"
  # config.vm.provision "docker" do |d|
  #   d.version = "18.06.2"
  # end
  # install docker-compose into the VM and run the docker-compose.yml file - if it exists -  whenever the  VM starts (https://github.com/leighmcculloch/vagrant-docker-compose)
  config.vm.provision :docker_compose, yml: "/devops_project/docker-compose.yml", rebuild: true, run: "always"

end
