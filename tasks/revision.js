/*
 * grunt-git-revision
 * https://github.com/unfold/grunt-git-revision
 *
 * Copyright (c) 2013 Simen Brekken
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.registerTask('revision', 'Retrieves the current git revision', function(property) {
    var options = this.options({
      property: 'meta.revision',
      short: true
    });

    var done = this.async();

    grunt.util.spawn({
      cmd: 'git',
      args: ['rev-parse', options.short && '--short', 'HEAD'].filter(Boolean)
    }, function(err, result) {
      if (err) {
        grunt.log.error(err);

        return done(false);
      }

      var revision = result.toString();

      grunt.config(options.property, revision);
      grunt.log.writeln('Found Git revision "' + revision + '"');

      done(true);
    });
  });
};
